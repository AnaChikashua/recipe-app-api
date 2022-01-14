from django.views.generic import TemplateView


class LogInView(TemplateView):
    template_name = 'login.html'


class IndexView(TemplateView):
    template_name = 'index.html'


class RecipeView(TemplateView):
    template_name = 'recipes.html'
