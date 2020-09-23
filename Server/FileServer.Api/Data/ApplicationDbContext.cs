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

        public DbSet<File> Files { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<UserData> UserDatas { get; set; }

        #region Methods
        protected override void OnModelCreating(ModelBuilder moduleBuilder)
        {
            moduleBuilder.Entity<File>().ToTable("Files");
            moduleBuilder.Entity<Error>().ToTable("ExceptionLogs");
            moduleBuilder.Entity<UserData>().ToTable("UserData");
        }
        #endregion
    }
}
