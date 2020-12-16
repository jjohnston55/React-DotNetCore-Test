using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetCore_Test.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryName = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryName);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductName = table.Column<string>(nullable: false),
                    Cost = table.Column<double>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductName);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategories",
                columns: table => new
                {
                    CategoryName = table.Column<string>(nullable: false),
                    ProductName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategories", x => new { x.CategoryName, x.ProductName });
                    table.ForeignKey(
                        name: "FK_ProductCategories_Categories_CategoryName",
                        column: x => x.CategoryName,
                        principalTable: "Categories",
                        principalColumn: "CategoryName",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCategories_Products_ProductName",
                        column: x => x.ProductName,
                        principalTable: "Products",
                        principalColumn: "ProductName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryName", "Active", "Description" },
                values: new object[,]
                {
                    { "Beverages", true, "Soft drinks" },
                    { "Dairy", true, "Cheeses" },
                    { "Condiments", true, "Sweet and savory sauces, relishes, spreads, and seasonings" },
                    { "Meat", true, "Prepared meats" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductName", "Active", "Cost", "Description" },
                values: new object[,]
                {
                    { "Water", true, 0.98999999999999999, "Fresh from the Mountains" },
                    { "Milk", true, 5.0, "Cow, Goat, Almond" },
                    { "Cheese", true, 8.0, "Cheddar, Pizza, Gouda" },
                    { "Ketchup", true, 10.99, "Goes with everything" },
                    { "Steak", true, 50.0, "Alberta Grade" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategories_ProductName",
                table: "ProductCategories",
                column: "ProductName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductCategories");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
