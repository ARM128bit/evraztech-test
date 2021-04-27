using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using evraztech_test.Models;

using Microsoft.EntityFrameworkCore;

namespace evraztech_test.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            return db.Equipment.ToList();
        }

        [HttpPost]
        public IActionResult Post(Equipment equipment)
        {
            equipment.ID = Guid.NewGuid();
            db.Equipment.Add(equipment);
            return Ok(equipment);
        }

        /*[HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Phone phone = data.FirstOrDefault(x => x.Id == id);
            if (phone == null)
            {
                return NotFound();
            }
            data.Remove(phone);
            return Ok(phone);
        }*/
    }
}
