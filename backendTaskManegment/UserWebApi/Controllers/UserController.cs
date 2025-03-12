using Microsoft.AspNetCore.Mvc;
using UserWebApi.Models;

namespace UserWebApi.Controllers
{
    public class UserController
    {
        [Route("api/[controller]")]
        [ApiController]
        public class UsersController : ControllerBase
        {
            private static List<User> users = new List<User>
{
    new User("1", "john_doe", "john@example.com"),  // Provide required constructor parameters
    new User("2", "jane_doe", "jane@example.com")   // Provide required constructor parameters
};

            // Get all users
            [HttpGet]
            public IActionResult GetUsers()
            {
                return Ok(users);
            }

            // Get a single user by ID
            [HttpGet("{id}")]
            public IActionResult GetUser(string id)
            {
                var user = users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                    return NotFound();

                return Ok(user);
            }

            // Create a new user
            [HttpPost]
            public IActionResult CreateUser([FromBody] User user)
            {
                user.Id = (users.Count + 1).ToString(); // Simple auto-increment logic
                users.Add(user);
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }

            // Update an existing user
            [HttpPut("{id}")]
            public IActionResult UpdateUser(string id, [FromBody] User updatedUser)
            {
                var user = users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                    return NotFound();

                user.Username = updatedUser.Username;
                user.Email = updatedUser.Email;
                return NoContent();
            }

            // Delete a user
            [HttpDelete("{id}")]
            public IActionResult DeleteUser(string id)
            {
                var user = users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                    return NotFound();

                users.Remove(user);
                return NoContent();
            }
        }
    }
}
