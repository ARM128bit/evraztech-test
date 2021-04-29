using System;
using Microsoft.EntityFrameworkCore;

namespace evraztech_test
{
    public class Equipment
    {
        public DateTime CreationDate { get; set; }

        public Guid ID { get; set; }

        public string Model { get; set; }

        public string Description { get; set; }
        public Guid TypeID { get; set; }
        public EquipmentType Type { get; set; }
    }
}
