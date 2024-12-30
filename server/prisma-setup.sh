echo "Generating prisma"
npx prisma generate

# echo "Migrating prisma"
# npx prisma migrate dev --name init

echo "Seed prisma"
npx prisma db seed

