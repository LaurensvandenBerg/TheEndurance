using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;
using Endurance.DbContexts;
using System.Linq;

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

		private void FetchCategories()
		{
			context.Categories.ToList();
		}
	}
}
