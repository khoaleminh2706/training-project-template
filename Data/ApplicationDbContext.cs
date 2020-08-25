using Microsoft.EntityFrameworkCore;
using FileServer.Data.Entities;

namespace FileServer.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(): base()
        {

        }

        public ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        #region Methods
        protected override void OnModelCreating(ModelBuilder moduleBuilder)
        {
            moduleBuilder.Entity<File>().ToTable("Files");
            moduleBuilder.Entity<Exception>().ToTable("ExceptionLogs");
        }
        #endregion
    }
}
