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

			return context.Expenses.ToList().Select(e => new CategoryExpense { Expense = e.Cost, Category = e.Category.Title }) ;
		}
	}
}
