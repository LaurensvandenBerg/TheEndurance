namespace Endurance.DbContexts.DataModels
{
	public class UserMonthlyExpense
	{
		public int Id { get; set; }
		public User User { get; set; }
		public Category Category { get; set; }
		public double Cost { get; set; }
		public int Month { get; set; }
		public int Year { get; set; }
	}
}
