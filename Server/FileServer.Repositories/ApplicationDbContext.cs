using FileServer.Repositories.Entities;
using Microsoft.EntityFrameworkCore;

namespace FileServer.Repositories
{
    internal class ApplicationDbContext: DbContext
    {
        internal ApplicationDbContext(): base()
        {

        }

        internal ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        internal DbSet<File> Files { get; set; }
        internal DbSet<Error> Errors { get; set; }
        internal DbSet<UserData> UserDatas { get; set; }

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
