﻿using System;

namespace Endurance.Models
{
	public class UserModel
	{
		public string Username { get; set; }
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public double Income { get; set; }
		public int NumberOfFamilyMembers { get; set; }
		public Gender Gender { get; set; }
		public byte[] Picture { get; set; }
		public Nullable<double> Latitude { get; set; }
		public Nullable<double> Longitude { get; set; }
		public DateTime SinceUTC { get; set; }
	}

	public enum Gender
	{
		Male,
		Female
	}
}
