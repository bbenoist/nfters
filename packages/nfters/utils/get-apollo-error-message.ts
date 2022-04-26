import { ApolloError } from '@apollo/client';

const getApolloNetworkErrorMessage = (error: ApolloError['networkError']): string | undefined => {
  if (error == null) return undefined;
  if ('result' in error) {
    // ServerError.result type is Record<string, any>
    const result = error.result as { errors?: { message?: string }[] } | undefined;
    if (result == null || result.errors == null) return undefined;
    const firstMessage = result.errors.find(({ message }) => message != null);
    if (firstMessage != null) return firstMessage.message;
  }
  return error.message;
};

/**
 * Tries to find the more meaningful error as possible from an ApolloError
 * @param error - The error to analyze
 */
export const getApolloErrorMessage = (error: ApolloError): string => {
  const { graphQLErrors, networkError } = error;
  if ((graphQLErrors?.length ?? 0) > 0) return graphQLErrors[0].message;
  const networkMessage = getApolloNetworkErrorMessage(networkError);
  if (networkMessage != null) return networkMessage;
  return error.message;
};
