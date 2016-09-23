namespace Endurance.Models
{
	public class CategoryExpenseComparison
	{
		public string Category { get; set; }
		public double SpecifiedMonthCost { get; set; }
		public double PreviousMonthCost { get; set; }
		public double Variance { get; set; }
		public bool IsWinning { get; set; }
	}
}
