using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskWebApi.Migrations
{
    /// <inheritdoc />
    public partial class addNewCol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_editing",
                table: "task",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "task",
                keyColumn: "task_id",
                keyValue: "1",
                column: "is_editing",
                value: false);

            migrationBuilder.UpdateData(
                table: "task",
                keyColumn: "task_id",
                keyValue: "2",
                column: "is_editing",
                value: false);

            migrationBuilder.UpdateData(
                table: "task",
                keyColumn: "task_id",
                keyValue: "3",
                column: "is_editing",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_editing",
                table: "task");
        }
    }
}
