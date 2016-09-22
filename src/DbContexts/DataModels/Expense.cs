﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Endurance.DbContexts.DataModels
{

	public class Expense
	{
		public int Id { get; set; }

		public string Description { get; set; }

		public Category Category { get; set; }

		public double Cost { get; set; }

		public DateTime CreationUTC { get; set; }
	}
}
