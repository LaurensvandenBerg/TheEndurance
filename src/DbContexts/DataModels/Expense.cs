using System;

namespace Endurance.DbContexts.DataModels
{
	public class Expense
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public Category Category { get; set; }
		public double Cost { get; set; }
		public DateTime CreationUTC { get; set; }
		public Nullable<double> Latitude { get; set; }
		public Nullable<double> Longitude { get; set; }
		public User User { get; set; }
	}
}