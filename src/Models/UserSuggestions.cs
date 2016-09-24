namespace Endurance.Models
{
	public class UserSuggestions
	{
		public string Username { get; set; }

		public string Firstname { get; set; }

		public string Lastname { get; set; }

		public CategorySuggestion[] CategorySuggestions { get; set; }
	}

	public class CategorySuggestion
	{
		public string Category { get; set; }
		public double Expense { get; set; }
		public int Winnings { get; set; }
		public int Losings { get; set; }
		public string Suggestion { get; set; }
		public Status Status { get; set; }
	}

	public enum Status
	{
		Winning,
		Losing,
		Danger
	}
}
