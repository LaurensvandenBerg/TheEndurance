using Endurance.DbContexts;
using Endurance.Models;
using Microsoft.AspNetCore.Mvc;
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
		public IEnumerable<Suggestion> Get(string subject)
		{
			return context.Suggestions.Where(s => s.subject == subject).Select(s => new Suggestion() { subject= s.subject, message = s.message});
		}
	}
}
