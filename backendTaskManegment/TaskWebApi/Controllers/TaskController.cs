using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskWebApi;

namespace TaskWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskDbContext _dbContext;
        public TaskController(TaskDbContext taskDbContext)
        {
            _dbContext = taskDbContext;
        }

        // Get all tasks
        [HttpGet]
        public ActionResult<IEnumerable<Models.Task>> GetTasks()
        {
            return _dbContext.Tasks;
        }

        // Get task by id (treat id as string)
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Task>> GetById(string id)  // id as string
        {
            var task = await _dbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();  // Return 404 if not found
            }
            return task;
        }

        // Create new task
        [HttpPost]
        public async Task<ActionResult> Create(Models.Task task)
        {
            await _dbContext.Tasks.AddAsync(task);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        // Update task
        [HttpPut]
        public async Task<ActionResult> Update(Models.Task task)
        {
            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        // Delete task by id (treat id as string)
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)  // id as string
        {
            var task = await _dbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();  // Return 404 if not found
            }

            _dbContext.Tasks.Remove(task);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        // Update task to mark as complete
        [HttpPut("{id}/complete")]
        public async Task<ActionResult<Models.Task>> CompleteTask(string id)
        {
            var task = await _dbContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.complete = true;  // Update the task's completion status
            await _dbContext.SaveChangesAsync();
            return Ok(task);  // Return the updated task
        }
    }
}
