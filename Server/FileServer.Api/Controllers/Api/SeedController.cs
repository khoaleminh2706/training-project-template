//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using FileServer.Data.Entities;
//using FileServer.Data;

//namespace FileServer.Controllers.Api
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class SeedController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public SeedController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet("import")]
//        public async Task<IActionResult> Import()
//        {
//            var files = new List<File>()
//            {
//                new File
//                {
//                    Id = new Guid(),
//                    Name = "CAS",
//                    Type = "folder",
//                    Extension = "",
//                    Content = null,
//                    CreatedAt = DateTime.UtcNow.AddHours(7),
//                    CreatedBy = "Khoa",
//                    ModifiedBy = "Khoa",
//                    ModilfiedAt = DateTime.UtcNow.AddHours(7)
//                },
//                new File
//                {
//                    Id = new Guid(),
//                    Name = "CoasterAndBargeLoading.xlsx",
//                    Type = "file",
//                    Extension = "xlsx",
//                    Content = null,
//                    CreatedAt = DateTime.UtcNow.AddHours(7),
//                    CreatedBy = "Khoa",
//                    ModifiedBy = "Khoa",
//                    ModilfiedAt = DateTime.UtcNow.AddHours(7)
//                },
//                new File
//                {
//                    Id = new Guid(),
//                    Name = "RevenueByService.xlsx",
//                    Type = "file",
//                    Extension = "xlsx",
//                    Content = null,
//                    CreatedAt = DateTime.UtcNow.AddHours(7),
//                    CreatedBy = "Administrator MOD",
//                    ModifiedBy = "Administrator MOD",
//                    ModilfiedAt = DateTime.UtcNow.AddHours(7)
//                }
//            };
//            _context.Files.AddRange(files); 
//            await _context.SaveChangesAsync();
//            return Ok();
//        }
//    }
//}
