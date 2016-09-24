using Endurance.DbContexts;
using Endurance.DbContexts.DataModels;
using Endurance.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Endurance.Controllers
{
	[Route("api/[controller]")]
	public class SuggestionsController : Controller
	{
		readonly ExpenseManagementContext context;

		public SuggestionsController(ExpenseManagementContext context)
		{
			this.context = context;
		}

		[HttpGet]
		public IEnumerable<Models.Suggestion> Get(string subject)
		{
			return context.Suggestions.Where(s => s.subject == subject).Select(s => new Models.Suggestion() { subject= s.subject, message = s.message});
		}

		[Route("GetForUser")]
		public UserSuggestions GetForUser(string username)
		{
			UserSuggestions suggestion = new UserSuggestions() { Username = username };
			var user = context.User.SingleOrDefault(u => u.Username == username);
			if (user != null)
			{
				suggestion.Firstname = user.Firstname;
				suggestion.Lastname = user.Lastname;

				var month = DateTime.Today.Month;
				var year = DateTime.Today.Year;

				context.Categories.ToList();

				var userExpenses = GetExpensesFor(user, month, year).ToArray();

				var nearbyUsers = context.User.Where(u =>
					u.Id != user.Id 
					&& IsLessThan100Km(user.Latitude.Value, user.Longitude.Value, u.Latitude.Value, u.Longitude.Value)
					&& HasSimilarFamilySize(user.NumberOfFamilyMembers, u.NumberOfFamilyMembers)
					&& IsInSimilarIncomeGroup(user.Income, u.Income));

				List<CategorySuggestion> categorySuggestions = new List<CategorySuggestion>();

				foreach (var concernedUserExpense in userExpenses)
				{
					int winning = 0;
					int losing = 0;
					foreach (var nearbyUser in nearbyUsers)
					{
						var expenses = GetExpensesFor(nearbyUser, month, year).ToArray();
						var expenseCost = expenses.SingleOrDefault(e => e.Category == concernedUserExpense.Category);
						if (expenseCost != null)
						{
							if (AreYouWinning(concernedUserExpense.Expense, expenseCost.Expense))
							{
								winning++;
							}
							else
							{
								losing++;
							}
						}
						else
						{
							losing++;
						}
					}

					categorySuggestions.Add(GetCategorySuggestion(concernedUserExpense.Category, concernedUserExpense.Expense, winning, losing));
					suggestion.CategorySuggestions = categorySuggestions.ToArray();
				}
			}

			return suggestion;
		}

		private bool AreYouWinning(double expense1, double expense2)
		{
			return expense1 < expense2 && Math.Abs(expense1 - expense2) > 10.0d;
		}

		private CategorySuggestion GetCategorySuggestion(string category, double expense, int winning, int losing)
		{
			string suggestion = "Not sufficient data";
			Status status = Status.Winning;
			if (winning > losing)
			{
				suggestion = "You are totally nailing in '" + category + "', by spending '" + expense + "' in this month";
			}
			else if (winning == losing)
			{
				suggestion = "There is room to improvement for you in '" + category + "' some users have done but some users are better in your region";
				status = Status.Losing;
			}
			else
			{
				suggestion = "There are more than 50% users in your region who are doing better than you in this '" + category + "'";
				status = Status.Danger;
			}

			return new CategorySuggestion { Category = category, Winnings = winning, Losings = losing, Suggestion = suggestion, Status = status, Expense = expense };
		}

		private bool IsLessThan100Km(double lat1, double lon1, double lat2, double lon2)
		{
			double theta = lon1 - lon2;
			double dist = Math.Sin(deg2rad(lat1)) * Math.Sin(deg2rad(lat2)) + Math.Cos(deg2rad(lat1)) * Math.Cos(deg2rad(lat2)) * Math.Cos(deg2rad(theta));
			dist = Math.Acos(dist);
			dist = rad2deg(dist);
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;

			return  dist  < 100.0;
		}

		private double deg2rad(double deg)
		{
			return (deg * Math.PI / 180.0);
		}

		private double rad2deg(double rad)
		{
			return (rad / Math.PI * 180.0);
		}

		private IEnumerable<CategoryExpense> GetExpensesFor(User user, int month, int year)
		{
			var expenses = context.Expenses.Where(e => e.User == user && e.CreationUTC.Month == month && e.CreationUTC.Year == year).GroupBy(e => e.Category);
			return expenses.Select(e => new CategoryExpense { Expense = e.Sum(t => t.Cost), Category = e.Key.Title });
		}

		private bool HasSimilarFamilySize(int numberOfFamilyMembers1, int numberOfFamilyMembers2)
		{
			return Math.Abs(numberOfFamilyMembers1 - numberOfFamilyMembers2) <= 1;
		}

		private bool IsInSimilarIncomeGroup(double income1, double income2)
		{
			var change = Math.Abs(income1 - income2);
			return Math.Abs(change / income1) < 15;
		}

	}
}

