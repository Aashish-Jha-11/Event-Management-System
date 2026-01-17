#!/bin/bash
set -e

echo "🔒 Removing secrets from git history..."

# Install git-filter-repo if not already installed
if ! command -v git-filter-repo &> /dev/null; then
    echo "📦 Installing git-filter-repo..."
    brew install git-filter-repo
fi

# Create backup
echo "📋 Creating backup..."
if [ ! -d "../Event-Management-System-backup" ]; then
    git clone . ../Event-Management-System-backup
    echo "✅ Backup created at ../Event-Management-System-backup"
fi

# Create replacement file
echo "🔧 Preparing secret replacement..."
cat > /tmp/secrets-to-remove.txt << 'EOF'
mongodb+srv://aashishjha1624_db_user:kEZ4WHWgjFQzPyvN==>[CREDENTIALS_REMOVED]
aashishjha1624_db_user==>[DB_USER_REMOVED]
kEZ4WHWgjFQzPyvN==>[PASSWORD_REMOVED]
EOF

# Remove secrets from all commits
echo "🧹 Removing secrets from git history..."
git filter-repo --force --replace-text /tmp/secrets-to-remove.txt

# Clean up
rm /tmp/secrets-to-remove.txt

echo ""
echo "✅ Secrets successfully removed from git history!"
echo ""
echo "⚠️  NEXT STEPS:"
echo "1. Force push to overwrite remote history:"
echo "   git remote add origin https://github.com/Aashish-Jha-11/Event-Management-System.git"
echo "   git push origin --force --all"
echo ""
echo "2. Rotate MongoDB credentials in MongoDB Atlas"
echo "3. Update Vercel environment variables with new credentials"
echo ""
