using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Endurance.Models;
using System;

namespace Endurance.Controllers
{
	[Route("api/[controller")]//TODO : check how routing works
	public class CategoriesController : Controller
	{

		Dictionary<string, Expense[]> categories = new Dictionary<string, Expense[]> {
			{ "Food and Beverage",
				new [] {
					new Expense() {
						ID = 1,
						Category = new CategoryExpense() { Category = "Food and Beverage" },
						Description = "Restaurant",
						Cost = 82.65,
						TransactionUTC = DateTime.Today
					},
					new Expense() {
						ID = 2,
						Category = new CategoryExpense() { Category = "Food and Beverage" },
						Description = "Drink on the road",
						Cost = 2.99,
						TransactionUTC = DateTime.Today
					}
				}
			},
			{ "Transportation",
				new [] {
					new Expense() {
						ID = 3,
						Category = new CategoryExpense() { Category = "Transportation" },
						Description = "Gas",
						Cost = 50.89,
						TransactionUTC = DateTime.Today
					},
					new Expense() {
						ID = 4,
						Category = new CategoryExpense() { Category = "Transportation" },
						Description = "Monthly insurance",
						Cost = 69.00,
						TransactionUTC = DateTime.Today
					}
				}
			},
			{ "Groceries",
				new [] {
					new Expense() {
						ID = 5,
						Category = new CategoryExpense() { Category = "Groceries" },
						Description = "Groceries for week 33",
						Cost = 43.67,
						TransactionUTC = DateTime.Today
					},
					new Expense() {
						ID = 6,
						Category = new CategoryExpense() { Category = "Groceries" },
						Description = "Groceries for week 34",
						Cost = 56.75,
						TransactionUTC = DateTime.Today
					}
				}
			},
			{ "Utilities",
				new [] {
					new Expense() {
						ID = 7,
						Category = new CategoryExpense() { Category = "Utilities" },
						Description = "Hammer",
						Cost = 19.99,
						TransactionUTC = DateTime.Today
					},
					new Expense() {
						ID = 8,
						Category = new CategoryExpense() { Category = "Utilities" },
						Description = "Lawnmower",
						Cost = 149.99,
						TransactionUTC = DateTime.Today
					}
				}
			},
			{ "Phones",
				new [] {
					new Expense() {
						ID = 3,
						Category = new CategoryExpense() { Category = "Phones" },
						Description = "Subscription",
						Cost = 17.50,
						TransactionUTC = DateTime.Today
					},
					new Expense() {
						ID = 3,
						Category = new CategoryExpense() { Category = "Phones" },
						Description = "IPhone lease",
						Cost = 17.99,
						TransactionUTC = DateTime.Today
					}
				}
			}
		};

		[HttpGet]
		public Expense[] Get(string Category)
		{
			return categories[Category];
		}
	}
}
