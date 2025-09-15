/**
 * Determines if a user is within the 30-day grace period for payment issues
 */
export function isInGracePeriod(paymentIssueSince: string | null): boolean {
  if (!paymentIssueSince) {
    return false;
  }

  const issueDate = new Date(paymentIssueSince);
  const now = new Date();
  const daysSinceIssue = Math.floor((now.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysSinceIssue <= 30; // 30-day grace period
}

/**
 * Gets the number of days remaining in the grace period
 */
export function getGraceDaysRemaining(paymentIssueSince: string | null): number {
  if (!paymentIssueSince) {
    return 0;
  }

  const issueDate = new Date(paymentIssueSince);
  const now = new Date();
  const daysSinceIssue = Math.floor((now.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return Math.max(0, 30 - daysSinceIssue); // 30-day grace period
}