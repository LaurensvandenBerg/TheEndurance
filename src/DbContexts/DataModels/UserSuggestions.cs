namespace Endurance.DbContexts.DataModels
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
		public int Winnings { get; set; }
		public int Losings { get; set; }

		public string Suggestion { get; set; }
	}
}
