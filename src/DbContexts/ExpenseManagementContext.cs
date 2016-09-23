﻿using Endurance.DbContexts.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Endurance.DbContexts
{
	public class ExpenseManagementContext : DbContext
	{
		public DbSet<Expense> Expenses { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<Suggestion> Suggestions { get; set; }

		public DbSet<User> Users { get; set; }

		public ExpenseManagementContext(DbContextOptions<ExpenseManagementContext> options)
		: base(options)
		{

		}
	}
}
