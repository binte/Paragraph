using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Paragraph.Models
{
    public partial class ParagraphDBContext : DbContext
    {
        public ParagraphDBContext()
        {

        }

        public ParagraphDBContext(DbContextOptions<ParagraphDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Para> Para { get; set; }
        public virtual DbSet<ParaLeft> ParaLeft { get; set; }
        public virtual DbSet<ParaRight> ParaRight { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:azure20.database.windows.net,1433;Initial Catalog=ParagraphDB;Persist Security Info=False;User ID=adminAzure;Password=*****;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Para>(entity =>
            {
                entity.Property(e => e.ParaId)
                    .HasColumnName("ParaID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ParaText)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ParaLeft>(entity =>
            {
                entity.HasKey(e => e.ParaId);

                entity.Property(e => e.ParaId)
                    .HasColumnName("ParaID")
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<ParaRight>(entity =>
            {
                entity.HasKey(e => e.ParaId);

                entity.Property(e => e.ParaId)
                    .HasColumnName("ParaID")
                    .ValueGeneratedNever();
            });
        }
    }
}
