using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;
using Endurance.DbContexts;
using System.Linq;
using System;
using Endurance.DbContexts.DataModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Endurance.Controllers
{

	[Route("api/[controller]")]
	public class TransactionsController : Controller
	{
		readonly ExpenseManagementContext context;

		public TransactionsController(ExpenseManagementContext context)
		{
			this.context = context;
		}

		// GET: api/values
		[HttpGet]
		public IEnumerable<CategoryExpense> Get()
		{
			FetchCategories();
			var expenses = context.Expenses.ToList().GroupBy(e => e.Category);
			return expenses.Select(e => new CategoryExpense { Expense = e.Sum(t => t.Cost), Category = e.Key.Title });
		}

		// GET: api/values
		[Route("GetForUser")]
		public IEnumerable<CategoryExpense> Get(string username, int? month, int? year)
		{
			if (!month.HasValue)
			{
				month = DateTime.Today.Month;
			}

			if (!year.HasValue)
			{
				year = DateTime.Today.Year;
			}

			FetchCategories();

			var user = context.User.SingleOrDefault(u => u.Username == username);
			if (user != null)
			{
				return GetExpensesFor(user, month, year);
			}
			return new CategoryExpense[0];
		}

		[Route("GetComparisonWithPreviousMonth")]
		public IEnumerable<CategoryExpenseComparison> GetComparisonWithPreviousMonth(string username, int? month, int? year)
		{
			if (!month.HasValue)
			{
				month = DateTime.Today.Month;
			}

			if (!year.HasValue)
			{
				year = DateTime.Today.Year;
			}

			int? previousMonth = new DateTime(year.Value, month.Value, 1).AddMonths(-1).Month;
			FetchCategories();
			var user = context.User.SingleOrDefault(u => u.Username == username);
			if (user != null)
			{
				var specifiedMonthExpenses = GetExpensesFor(user, month, year);
				var previousMonthExpenses = GetExpensesFor(user, previousMonth, year);

				return ComparedExpenses(specifiedMonthExpenses, previousMonthExpenses);
			}
			return new CategoryExpenseComparison[0];
		}

		private IEnumerable<CategoryExpense> GetExpensesFor(User user, int? month, int? year)
		{
			var expenses = context.Expenses.Where(e => e.User == user && e.CreationUTC.Month == month.Value && e.CreationUTC.Year == year.Value).GroupBy(e => e.Category);
			return expenses.Select(e => new CategoryExpense { Expense = e.Sum(t => t.Cost), Category = e.Key.Title });
		}

		private IEnumerable<CategoryExpenseComparison> ComparedExpenses(IEnumerable<CategoryExpense> latestMonthExpenses, IEnumerable<CategoryExpense> previousMonthExpenses)
		{
			List<CategoryExpenseComparison> result = new List<CategoryExpenseComparison>();
			foreach (var expense in latestMonthExpenses)
			{
				var previousMonthExpense = previousMonthExpenses.SingleOrDefault(e => e.Category == expense.Category);
				double previousMonthCost = previousMonthExpense != null ? previousMonthExpense.Expense : 0.0d;
				result.Add(new CategoryExpenseComparison { Category = expense.Category, PreviousMonthCost = previousMonthCost, SpecifiedMonthCost = expense.Expense, Variance = previousMonthCost - expense.Expense, IsWinning = previousMonthCost - expense.Expense > 0 });
			}

			foreach (var expense in previousMonthExpenses)
			{
				var latestMonthExpense = latestMonthExpenses.SingleOrDefault(e => e.Category == expense.Category);
				double latestMonthCost = latestMonthExpense != null ? latestMonthExpense.Expense : 0.0d;

				var existingEntry = result.SingleOrDefault(e => e.Category == expense.Category);
				if (existingEntry == null)
				{
					result.Add(new CategoryExpenseComparison { Category = expense.Category, PreviousMonthCost = latestMonthCost, SpecifiedMonthCost = expense.Expense, Variance = expense.Expense - latestMonthCost, IsWinning = expense.Expense - latestMonthCost > 0 });
				}
				else
				{
					existingEntry.PreviousMonthCost = expense.Expense;
					existingEntry.SpecifiedMonthCost = latestMonthCost;
					existingEntry.Variance = expense.Expense - latestMonthCost;
					existingEntry.IsWinning = existingEntry.Variance > 0;
				}
			}
			return result;
		}

		private void FetchCategories()
		{
			context.Categories.ToList();
		}
	}
}
