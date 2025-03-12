using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskWebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "task",
                columns: table => new
                {
                    task_id = table.Column<string>(type: "varchar(255)", nullable: false),
                    task_status = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    task_name = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_task", x => x.task_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.InsertData(
                table: "task",
                columns: new[] { "task_id", "task_status", "task_name" },
                values: new object[,]
                {
                    { "1", false, "Task 1" },
                    { "2", false, "Task 2" },
                    { "3", false, "Task 3" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "task");
        }
    }
}
