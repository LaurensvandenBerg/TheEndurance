using System;
using Xunit;
using Endurance.Controllers;

namespace Tests
{
    public class TransactionsControllerTests
    {
        [Fact]
        public void GivenTransactionsAreAvailable_WhenGettingTransactions_ItShouldReturnThem() 
        {
            // Arrange
            var transactionsController = new TransactionsController();

            // Act
            var transactions = transactionsController.Get();

            // Assert
            Assert.True(transactions.Count == 5);
        }
    }
}
