using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Endurance.DbContexts;

namespace src.Migrations
{
    [DbContext(typeof(ExpenseManagementContext))]
    [Migration("20160922205848_CreatingUsers")]
    partial class CreatingUsers
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

                    b.Property<double?>("Latitude");

                    b.Property<double?>("Longitude");

                    b.Property<long?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("Endurance.DbContexts.DataModels.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Firstname");

                    b.Property<int>("Gender");

                    b.Property<double>("Income");

                    b.Property<string>("Lastname");

                    b.Property<double?>("Latitude");

                    b.Property<double?>("Longitude");

                    b.Property<int>("NumberOfFamilyMembers");

                    b.Property<byte[]>("Picture");

                    b.Property<DateTime>("SinceUTC");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Endurance.DbContexts.DataModels.Expense", b =>
                {
                    b.HasOne("Endurance.DbContexts.DataModels.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("Endurance.DbContexts.DataModels.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
        }
    }
}
