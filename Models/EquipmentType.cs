using System;
using System.Collections.Generic;

namespace evraztech_test
{
    public class EquipmentType
    {
        public string Name { get; set; }
        public Guid ID { get; set; }
        public List<Equipment> Equipments { get; set; }
    }
}
