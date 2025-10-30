@echo off
echo ========================================
echo MINERVA Booking System Setup
echo ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/5] Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma client
    pause
    exit /b 1
)
echo.

echo [3/5] Creating database...
call npx prisma db push
if errorlevel 1 (
    echo ERROR: Failed to create database
    pause
    exit /b 1
)
echo.

echo [4/5] Seeding database with initial data...
call npx tsx prisma/seed.ts
if errorlevel 1 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Copy .env.example to .env
echo 2. Configure your Gmail SMTP credentials in .env
echo 3. Run: npm run dev
echo 4. Visit: http://localhost:3000/booking
echo.
echo For detailed setup instructions, see BOOKING_SETUP.md
echo ========================================
pause
