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
			return context.Suggestions.Where(s => s.subject == subject).Select(s => new Models.Suggestion() { subject = s.subject, message = s.message });
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

				var month = 9;
				var year = 2016;

				context.Categories.ToList();

				var userExpenses = GetExpensesFor(user, month, year).ToArray();

				var nearbyUsers = context.User.Where(u =>
					u.Id != user.Id
					&& IsLessThan100Km(user.Latitude.Value, user.Longitude.Value, u.Latitude.Value, u.Longitude.Value)
					&& HasSimilarFamilySize(user.NumberOfFamilyMembers, u.NumberOfFamilyMembers)
					&& IsInSimilarIncomeGroup(user.Income, u.Income));

				List<CategorySuggestion> categorySuggestions = new List<CategorySuggestion>();
				List<Advertisment> advertisments = new List<Advertisment>();

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

					if (winning < losing)
					{
						advertisments.Add(GetRandomAdvertisment(concernedUserExpense.Category));
					}
					categorySuggestions.Add(GetCategorySuggestion(concernedUserExpense.Category, concernedUserExpense.Expense, winning, losing));
					suggestion.CategorySuggestions = categorySuggestions.ToArray();
					suggestion.Advertisments = advertisments.ToArray();
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
				suggestion = "You are totally nailing it in " + category + ", by spending only " + expense + " this month";
			}
			else if (winning == losing)
			{
				suggestion = "There is room to improvement for you in " + category + " some users have done but some users are better in your region";
				status = Status.Losing;
			}
			else
			{
				suggestion = "More than 50% of the users in your region who have a lower spending in " + category;
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

			return dist < 100.0;
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
			return expenses.Select(e => new CategoryExpense { Expense = Math.Round(e.Sum(t => t.Cost), 2), Category = e.Key.Title });
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

		private Advertisment GetRandomAdvertisment(string category)
		{
			return StaticAds.Ads[category][0];
		}
	}

	internal static class StaticAds
	{
		public static Dictionary<string, List<Advertisment>> Ads = new Dictionary<string, List<Advertisment>>
			{
				{
					"Travel", new List<Advertisment> {
						new Advertisment { CompanyName ="Ross Travel", Contact="+31-654821395", Location = "Dreef 2, Belgium", Url ="www.roostravel.be" }
					}
				},
				{
					"Insurance", new List<Advertisment> {
						new Advertisment { CompanyName ="Zekur", Contact="+31-630479501", Location = "Amsterdam, The Netherlands", Url="www.zekur.nl" },
						new Advertisment { CompanyName ="Aevitae", Contact="+31-674083451", Location = "Den Haag, The Netherlands", Url="www.aevitae.nl" },
						new Advertisment { CompanyName ="Beheer", Contact="+31-642685364", Location = "Eindhoven, The Netherlands", Url="www.beheer.nl" },
						new Advertisment { CompanyName ="Mendis", Contact="+31-634895127", Location = "Haarlem, The Netherlands", Url="www.mendis.nl" },
						new Advertisment { CompanyName ="FBTO", Contact="+31-637495214", Location = "Zwolle, The Netherlands", Url="www.fbto.nl" }
					}
				},
				{
					"Entertainment", new List<Advertisment> {
						new Advertisment { CompanyName ="Pathe", Contact="+31-638753951", Location = "Amsterdam, The Netherlands", Url="www.pathe.nl" },
						new Advertisment { CompanyName ="Vue", Contact="+31-674083451", Location = "Den Haag, The Netherlands", Url="www.vue.nl" },
						new Advertisment { CompanyName ="Luxor", Contact="+31-611222333", Location = "Eindhoven, The Netherlands", Url="www.luxor.nl" }
					}
				},
				{
					"Utilities", new List<Advertisment> {
						new Advertisment { CompanyName ="Gas-Trading Holland B.V.", Contact="+31-628707985", Location = "Niewerkerk aan de Ijssel, The Netherlands", Url="www.grstrading.nl" }
					}
				},
				{
					"Groceries", new List<Advertisment> {
						new Advertisment { CompanyName ="Supermarkt Diever BV", Contact="+31-635042587", Location = "Hoofdstraat 82", Url="www.supermarktdiever.nl" }
					}
				},
				{
					"Dining", new List<Advertisment> {
						new Advertisment { CompanyName ="Mc Donalds", Contact="+31-674083451", Location = "Amsterdam, The Netherlands", Url="www.mcdonals.nl" },
						new Advertisment { CompanyName ="Burger King", Contact="+31-674083451", Location = "Den Haag, The Netherlands", Url="www.bk.nl" },
						new Advertisment { CompanyName ="KFC", Contact="+31-611222333", Location = "Eindhoven, The Netherlands", Url="www.kfc.nl" }
					}
				}
			};

	}
}

