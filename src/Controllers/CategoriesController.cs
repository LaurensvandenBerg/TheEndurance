using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;
using System.Linq;
using Endurance.DbContexts;
using System;

namespace Endurance.Controllers
{
	[Route("api/[controller]")]
	public class CategoriesController : Controller
	{
		readonly ExpenseManagementContext context;

		public CategoriesController(ExpenseManagementContext context)
		{
			this.context = context;
		}

		[HttpGet]
		public IEnumerable<Expense> Get(string categoryTitle)
		{
			var category = context.Categories.FirstOrDefault(c => c.Title.ToUpper() == categoryTitle.ToUpper());
			return context.Expenses.Where(e => e.Category == category).Select(e => new Expense() { Id = e.Id, Description = e.Description, Cost = e.Cost, TransactionUTC= e.CreationUTC });
		}

		[Route("GetForUser")]
		public IEnumerable<Expense> Get(string username, string categoryTitle, int? month, int? year)
		{
			if (!month.HasValue || month.Value == 0)
			{
				month = DateTime.Today.Month;
			}
			else
			{
				month++;
			}

			if (!year.HasValue || year.Value == 0)
			{
				year = DateTime.Today.Year;
			}

			var user = context.User.SingleOrDefault(u => u.Username == username);

			var category = context.Categories.FirstOrDefault(c => c.Title.ToUpper() == categoryTitle.ToUpper());
			var expenses = context.Expenses.ToArray();
			return expenses.Where(e => e.Category == category
					&& e.User == user
					&& e.CreationUTC.Month == month
					&& e.CreationUTC.Year == year)
				.Select(e => new Expense() { Id = e.Id, Description = e.Description, Cost = e.Cost, TransactionUTC = e.CreationUTC });
		}

	}
}
