using System;

namespace Endurance.Models
{
    public class Expense
    {
        public int Id { get; set; }
		public string Description { get; set; }

		public double Cost { get; set; }

		public DateTime TransactionUTC { get; set; }
    }
}
