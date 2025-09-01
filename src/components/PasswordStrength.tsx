interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    return {
      score,
      checks,
      strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
  };

  if (!password) return null;

  const { score, checks, strength } = getPasswordStrength(password);

  const strengthColors = {
    weak: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    strong: 'text-green-600 bg-green-50 border-green-200'
  } as const;

  const barColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  } as const;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-colors ${
              level <= score
                ? barColors[strength as keyof typeof barColors]
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Strength Label */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${strengthColors[strength as keyof typeof strengthColors]}`}>
        Password strength: {strength}
      </div>

      {/* Requirements */}
      <div className="space-y-1">
        <div className={`flex items-center text-xs ${checks.length ? 'text-green-600' : 'text-gray-500'}`}>
          <svg className={`w-3 h-3 mr-2 ${checks.length ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          At least 8 characters
        </div>
        <div className={`flex items-center text-xs ${checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
          <svg className={`w-3 h-3 mr-2 ${checks.lowercase ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          One lowercase letter
        </div>
        <div className={`flex items-center text-xs ${checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
          <svg className={`w-3 h-3 mr-2 ${checks.uppercase ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          One uppercase letter
        </div>
        <div className={`flex items-center text-xs ${checks.number ? 'text-green-600' : 'text-gray-500'}`}>
          <svg className={`w-3 h-3 mr-2 ${checks.number ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          One number
        </div>
      </div>
    </div>
  );
}