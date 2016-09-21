using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Endurance.Controllers
{

	[Route("api/[controller]")]
	public class TransactionsController : Controller
	{
		// GET: api/values
		[HttpGet]
		public IEnumerable<CategoryExpense> Get()
		{
			return new CategoryExpense[] {
				new CategoryExpense { Category="Food and Beverage", Expense= 609 },
				new CategoryExpense { Category="Transportation", Expense= 125 },
				new CategoryExpense { Category="Groceries", Expense= 800 },
				new CategoryExpense { Category="Utilities", Expense= 160 },
				new CategoryExpense { Category="Phones", Expense= 120 }
			};
		}
	}
}
