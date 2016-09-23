using Endurance.DbContexts;
using Endurance.DbContexts.DataModels;
using Endurance.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Endurance.Controllers
{
	[Route("api/[controller]")]
	public class UserController : Controller
	{
		readonly ExpenseManagementContext context;

		public UserController(ExpenseManagementContext context)
		{
			this.context = context;
		}

		[HttpGet]
		public IEnumerable<UserModel> Get()
		{
			return context.User.ToList().Select(ToUserModel);
		}

		[Route("GetSpecificUser")]
		public IEnumerable<UserModel> Get(string username)
		{
			return context.User.Where(u => u.Username == username).Select(ToUserModel);
		}

		private UserModel ToUserModel(User user)
		{
			return new UserModel
			{
				Firstname = user.Firstname,
				Lastname = user.Lastname,
				Gender = user.Gender == DbContexts.DataModels.Gender.Female ? Models.Gender.Female : Models.Gender.Male,
				Income = user.Income,
				Latitude = user.Latitude,
				Longitude = user.Longitude,
				NumberOfFamilyMembers = user.NumberOfFamilyMembers,
				Username = user.Username,
				Picture = user.Picture,
				SinceUTC = user.SinceUTC
			};
		}

	}
}
