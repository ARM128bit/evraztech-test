using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace evraztech_test
{
    public class EquipmentType
    {
        [Required]
        public string Name { get; set; }
        public Guid ID { get; set; }
        public List<Equipment> Equipments { get; set; }
    }
}
