using Microsoft.EntityFrameworkCore;
using System;

namespace Endurance.DbContexts
{
	public class ExpenseManagementContext : DbContext
	{
		public DbSet<Expense> Expenses { get; set; }

		public DbSet<Category> Categories { get; set; }

		public ExpenseManagementContext(DbContextOptions<ExpenseManagementContext> options)
		: base(options)
		{

		}
	}

	public class Expense
	{
		public int Id { get; set; }

		public string Description { get; set; }
		
		public Category Category { get; set; }

		public double Cost { get; set; }

		public DateTime CreationUTC { get; set; }
	}

	public class Category
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public bool IsExpense { get; set; }
	}
}
