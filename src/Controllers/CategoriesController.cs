using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;
using System.Linq;
using Endurance.DbContexts;

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
		
	}
}
