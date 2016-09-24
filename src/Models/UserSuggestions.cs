namespace Endurance.Models
{
	public class UserSuggestions
	{
		public string Username { get; set; }

		public string Firstname { get; set; }

		public string Lastname { get; set; }

		public CategorySuggestion[] CategorySuggestions { get; set; }

		public Advertisment[] Advertisments { get; set; }
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

	public class Advertisment
	{
		public string CompanyName { get; set; }
		public string Location { get; set; }
		public string Contact { get; set; }
		public string ServiceText { get; set; }
		public string Url { get; set; }
	}
}
