---
layout: cheatsheet
title: Rspec Cheatsheet
---
# Rspec Cheatsheet

## Stubbing, Mocking and Spying

___

### Stubs

{% highlight ruby %}
  describe Book do
    describe "#author_name" do
      it "calls the name of the author" do
        book   = Book.new()
        author = double(:author)
        allow(book).to receive(:author).and_return(author)
        allow(author).to receive(:name).and_return("Murakami")

        result = book.author_name

        expect(result).to eq('Murakami')
      end
    end
  end
{% endhighlight %}

### Mocks

{% highlight ruby %}
  describe Book do
    describe "#author_name" do
      it "calls the name of the autor" do
        book   = Book.new()
        author = double(:author)
        allow(book).to receive(:author).and_return(author)
        expect(author).to receive(:name).and_return("Murakami")

        result = book.author_name

        expect(result).to eq('Murakami')
      end
    end
  end
{% endhighlight %}

### Spies

{% highlight ruby %}
  describe Book do
    describe "#author_name" do
      it "calls the name of the autor" do
        book   = Book.new()
        author = double(:author)
        allow(book).to receive(:author).and_return(author)
        allow(author).to receive(:name).and_return("Murakami")

        result = book.author_name

        expect(book).to have_received(:author).and_return(author)
        expect(author).to have_received(:name).and_return("Murakami")
        expect(result).to eq('Murakami')
      end
    end
  end
{% endhighlight %}
