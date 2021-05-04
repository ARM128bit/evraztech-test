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
    [Route("api/[controller]")]
    public class EquipmentTypeController : ControllerBase
    {

        private ApplicationContext db;
        public EquipmentTypeController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<EquipmentType> Get()
        {
            return db.EquipmentType.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewEquipmentType([FromForm] EquipmentType equipmentType)
        {
            if (ModelState.IsValid)
            {
                equipmentType.ID = Guid.NewGuid();
                db.EquipmentType.Add(equipmentType);
                await db.SaveChangesAsync();
                return Created("CreateNewEquipmentType", equipmentType);
            }
            else
            {
                return BadRequest();
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            bool _exist = db.Equipment.Any(u => u.TypeID.ToString() == id);
            if (_exist)
            {
                return BadRequest(new
                {
                    type = "danger",
                    title = "Ошибка!",
                    message = "Невозможно удалить тип оборудования, так как он используется!"
                });
            }
            else
            {
                EquipmentType equipmentType = await db.EquipmentType.FirstOrDefaultAsync(p => p.ID.ToString() == id);
                if (equipmentType == null)
                {
                    return NotFound();
                }
                db.EquipmentType.Remove(equipmentType);
                await db.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
