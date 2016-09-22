using System;

namespace Endurance.Models
{
    public class Expense
    {
		public string Description { get; set; }

		public double Cost { get; set; }

		public DateTime TransactionUTC { get; set; }
    }
}
