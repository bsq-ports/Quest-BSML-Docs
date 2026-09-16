import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@cloudflare/kumo";

export const Route = createFileRoute("/development")({
  component: Development,
});

const BSMLExample = `<bg xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='https://raw.githubusercontent.com/RedBrumbler/Quest-BSML-Docs/gh-pages/schema.xsd'>
    <!-- Your BSML Code here -->
</bg>`;

const OptionsBSML = `<bg>
    <dropdown data='identifier'/>
</bg>`;

const OptionsExample = `DECLARE_CLASS_CODEGEN(MyMod, MyClass, Il2CppObject,
    BSML_OPTIONS_LIST_OBJECT(identifier, "Option1", "Option2", "Option3");
)`;

const PropertyExample = `// .hpp code:
DECLARE_CLASS_CODEGEN(MyMod, MyClass, Il2CppObject,
    DECLARE_BSML_PROPERTY(int, number);
    // The above line is essentially equivalent to these macros combined:
    // DECLARE_INSTANCE_FIELD(int, _number);
    // DECLARE_INSTANCE_METHOD(int, get_number);
    // DECLARE_INSTANCE_METHOD(void, set_number, int value);
)

// .cpp code:
DEFINE_TYPE(MyMod, MyClass);

namespace MyMod {
    // the backing field already exists, so we will not have to worry about that
    int MyClass::get_number() { return _number; }
    void MyClass::set_number(int value) { _number = value; }
}`;

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-kumo-line bg-kumo-base p-3 text-sm">
      <code>{children}</code>
    </pre>
  );
}

function Development() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Text variant="heading" as="h1" size="lg">
          Development
        </Text>
        <Text variant="secondary">Creating your very own BSML files</Text>
      </div>

      <p>
        This page will have information about creating .bsml files for your mods,
        and how to setup your development environment for them. It assumes you know
        how to edit files in your favourite code editor.
      </p>
      <p>
        To effectively use the BSML library, you should use the BSML xml schema, so
        that values will be auto completed for you and properly validated. Most code
        editors with support for XML editing will automatically download the schema
        if your XML file defines this schema. For this purpose here's a code example
        of a BSML file that should have the schema location embedded, causing your
        code editor to check the bsml file for syntax and proper tags.
      </p>
      <CodeBlock>{BSMLExample}</CodeBlock>
      <p>
        Just copy the code here and put it in your .bsml file as a base, and then
        develop your UI from there.
      </p>

      <Text variant="heading" as="h2">
        Extra step for VSCode
      </Text>
      <p>
        An extra step you should take in VSCode is to add an xml tools extension
        (the ones by Red Hat or Josh Johnson should suffice). You should also go
        into your settings and enter the search query "files: associations" into
        the search bar, and add an alias for "*.bsml" to "xml". This way VSCode
        will use bsml files as if they are xml files. If you are using a different
        code editor then it's an exercise for the reader to do this.
      </p>

      <Text variant="heading" as="h2">
        Useful macros
      </Text>
      <p>
        If you have a dropdown, list-setting or list-slider-setting in BSML like
        this:
      </p>
      <CodeBlock>{OptionsBSML}</CodeBlock>
      <p>
        And want to use a list of strings for the data in that dropdown, then you
        should be able to provide this list using the macros in
        "bsml/shared/macros.hpp". The specific macro to use is
        BSML_OPTIONS_LIST_OBJECT, which is used like this:
      </p>
      <CodeBlock>{OptionsExample}</CodeBlock>
      <p>
        Another macro contained in this header is
        DECLARE_BSML_PROPERTY(_type, _name); which automatically declares a backing
        field, getter and setter for you. It should be used as follows:
      </p>
      <CodeBlock>{PropertyExample}</CodeBlock>
    </div>
  );
}
