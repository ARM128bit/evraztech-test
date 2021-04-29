using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using evraztech_test.Models;

using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace evraztech_test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {

        private ApplicationContext db;
        public EquipmentController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<Equipment> Get()
        {
            return db.Equipment.Include(e => e.Type).ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Equipment equipment)
        {
            Console.WriteLine(equipment);
            equipment.ID = Guid.NewGuid();
            equipment.CreationDate = DateTime.Now;
            db.Equipment.Add(equipment);
            await db.SaveChangesAsync();
            return Ok(equipment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            Equipment equipment = await db.Equipment.FirstOrDefaultAsync(p => p.ID.ToString() == id);
            if (equipment == null)
            {
                return NotFound();
            }
            db.Equipment.Remove(equipment);
            await db.SaveChangesAsync();
            return Ok(equipment);
        }
    }
}
