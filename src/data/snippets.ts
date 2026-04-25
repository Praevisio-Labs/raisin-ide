import type { Language } from '@/types'

export const SNIPPETS: Record<Language, string> = {
    typescript: `interface User {
  id: number
  name: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}\`
}`,
    javascript: `const greet = (name) => {
  console.log(\`Hello, \${name}\`)
}

greet("World")`,
    python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
    java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello")
  }
}`,
}
