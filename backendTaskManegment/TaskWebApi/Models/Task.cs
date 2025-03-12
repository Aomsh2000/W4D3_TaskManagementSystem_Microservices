using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskWebApi.Models
{
    [Table("task")]
    public class Task
    {
        [Key]  // Marks 'id' as the primary key
        [Column("task_id")]
        public string id { get; set; } 


        [Column("task_status")]
        public bool complete { get; set; }


        [Column("task_name")]
        public string name { get; set; }

        [Column("is_editing")]
        public bool isEditing { get; set; }


        public Task(string id, bool complete, string name,bool isEditing)
        {
            this.id = id;
            this.complete = complete;
            this.name = name;
            this.isEditing = isEditing;
        }

        public Task() { }
    }
    

    }
