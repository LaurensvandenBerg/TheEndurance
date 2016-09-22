using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Endurance.DbContexts;

namespace src.Migrations
{
    [DbContext(typeof(ExpenseManagementContext))]
    [Migration("20160922160524_AdditionOfSuggestionTable")]
    partial class AdditionOfSuggestionTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Endurance.DbContexts.DataModels.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("IsExpense");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Endurance.DbContexts.DataModels.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<double>("Cost");

                    b.Property<DateTime>("CreationUTC");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("Endurance.DbContexts.DataModels.Suggestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("message");

                    b.Property<string>("subject");

                    b.HasKey("Id");

                    b.ToTable("Suggestions");
                });

            modelBuilder.Entity("Endurance.DbContexts.DataModels.Expense", b =>
                {
                    b.HasOne("Endurance.DbContexts.DataModels.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });
        }
    }
}
