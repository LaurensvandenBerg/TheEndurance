using Endurance.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Endurance.Controllers
{
	[Route("api/[controller")]
	public class SuggestionsController : Controller
	{
		Dictionary<string, Suggestion> suggestions = new Dictionary<string, Suggestion>
		{
			{
				"Groceries", new Suggestion()
				{
					ID = 1,
					subject = "Groceries",
					message = "you could save 13.41 euros per month if you shop at Jumbo instead of Albert Heijn"
				}
			},
			{
				"Transportation", new Suggestion()
				{
					ID = 2,
					subject = "Transportation",
					message = "you could save 5 euros per week if you only fuel your car at Shell"
				}
			}
		};
		[HttpGet]
		public Suggestion Get(string subject)
		{
			return suggestions[subject];
		}
	}
}
