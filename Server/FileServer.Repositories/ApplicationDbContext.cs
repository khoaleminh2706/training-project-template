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
        internal DbSet<FileContent> FileContent { get; set; }

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>()
                .ToTable("Files")
                .HasOne(f => f.FileContent)
                .WithOne(f => f.File)
                .HasForeignKey<FileContent>(fc => fc.FileId);
                
            modelBuilder.Entity<FileContent>()
                .ToTable("FileContent");
            modelBuilder.Entity<Error>().ToTable("ExceptionLogs");
            modelBuilder.Entity<UserData>().ToTable("UserData");
        }
        #endregion
    }
}
